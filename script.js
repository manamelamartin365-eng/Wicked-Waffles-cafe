// Wicked Waffles: menu, filters, product details and a basket shared by every page.
(() => {
  const $ = (id) => document.getElementById(id);
  const filterContainer = $('menu-filters');
  const productGrid = $('product-grid');
  const productModal = $('product-modal');
  const cartOverlay = $('cart-overlay');
  let activeCategory = 'All';
  let searchTerm = '';
  let sortMode = 'featured';
  let selectedProduct = null;
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('ww-basket') || '[]'); } catch (_) { cart = []; }

  const money = n => new Intl.NumberFormat('en-ZA', {style:'currency',currency:cafeSettings.currency || 'ZAR'}).format(n);
  const safe = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const price = p => typeof p.price === 'number' ? money(p.price) : 'Price to be confirmed';
  function saveCart(){ try { localStorage.setItem('ww-basket', JSON.stringify(cart)); } catch (_) {} }
  function overlay(el, open){
    if(!el) return;
    el.classList.toggle('open',open);
    el.setAttribute('aria-hidden',String(!open));
    document.body.classList.toggle('no-scroll',!!document.querySelector('.overlay.open'));
  }
  function toast(msg){
    const el=$('toast'); if(!el) return;
    el.textContent=msg; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600);
  }
  function renderFilters(){
    if(!filterContainer) return;
    filterContainer.innerHTML=menuCategories.map(c=>`<button class="filter-btn ${c===activeCategory?'active':''}" type="button" data-category="${safe(c)}">${safe(c)}</button>`).join('');
    filterContainer.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
      activeCategory=b.dataset.category;
      const select=$('category-filter'); if(select) select.value=activeCategory;
      renderFilters(); renderProducts();
    }));
  }
  function renderProducts(){
    if(!productGrid) return;
    let found=products.filter(p=>(activeCategory==='All'||p.category===activeCategory)&&`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(searchTerm));
    if(sortMode==='price-low') found.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
    if(sortMode==='price-high') found.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));
    if(sortMode==='name') found.sort((a,b)=>a.name.localeCompare(b.name));
    productGrid.innerHTML=found.length?found.map(p=>`
      <article class="product-card">
        <div class="product-image"><img src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy">${p.special?'<span class="product-badge">Demo special</span>':''}</div>
        <div class="product-info">
          <div class="product-tag">${safe(p.category)}</div>
          <div class="product-meta"><h3>${safe(p.name)}</h3><span class="product-price">${safe(price(p))}</span></div>
          <p>${safe(p.description)}</p>
          <div class="product-actions">
            <button class="button button-dark add-card-button" type="button" data-add="${safe(p.id)}">Add to basket</button>
            <button class="button details-button" type="button" data-details="${safe(p.id)}">View details</button>
          </div>
        </div>
      </article>`).join(''):'<div class="empty-menu">No menu items match your search. Try another name or category.</div>';
    productGrid.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add,1)));
    productGrid.querySelectorAll('[data-details]').forEach(b=>b.addEventListener('click',()=>openProduct(b.dataset.details)));
  }
  function openProduct(id){
    selectedProduct=products.find(p=>p.id===id); if(!selectedProduct||!productModal) return;
    $('modal-image').src=selectedProduct.image; $('modal-image').alt=selectedProduct.name;
    $('modal-category').textContent=selectedProduct.category; $('modal-name').textContent=selectedProduct.name;
    $('modal-description').textContent=selectedProduct.description; $('modal-price').textContent=price(selectedProduct);
    $('modal-quantity').value=1; overlay(productModal,true);
  }
  function addToCart(id,quantity){
    const p=products.find(x=>x.id===id); if(!p) return;
    const old=cart.find(i=>i.id===id);
    if(old) old.quantity+=quantity; else cart.push({id,quantity});
    saveCart(); renderCart(); toast(`${p.name} added to your basket`);
  }
  function renderCart(){
    const count=cart.reduce((s,i)=>s+i.quantity,0);
    document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count);
    const box=$('cart-items'); if(!box) return;
    // Drop old basket items if their product was removed from products.js.
    cart=cart.filter(i=>products.some(p=>p.id===i.id)); saveCart();
    box.innerHTML=cart.length?cart.map(i=>{
      const p=products.find(x=>x.id===i.id);
      return `<div class="cart-item"><img src="${safe(p.image)}" alt=""><div><h3>${safe(p.name)}</h3><small>${safe(price(p))}</small><div class="cart-item-actions"><button data-action="minus" data-id="${safe(i.id)}" aria-label="Decrease quantity">−</button>${i.quantity}<button data-action="plus" data-id="${safe(i.id)}" aria-label="Increase quantity">+</button><button class="remove-item" data-action="remove" data-id="${safe(i.id)}">Remove</button></div></div><strong>${typeof p.price==='number'?money(p.price*i.quantity):''}</strong></div>`;
    }).join(''):'<p class="cart-empty">Your basket is empty. Add something delicious from the menu.</p>';
    const priced=cart.every(i=>typeof products.find(p=>p.id===i.id).price==='number');
    const total=cart.reduce((s,i)=>s+(products.find(p=>p.id===i.id).price||0)*i.quantity,0);
    if($('cart-total')) $('cart-total').textContent=cart.length?(priced?money(total):'To be confirmed'):money(0);
    box.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>{
      const i=cart.find(x=>x.id===b.dataset.id); if(!i)return;
      if(b.dataset.action==='plus')i.quantity++;
      if(b.dataset.action==='minus')i.quantity--;
      if(b.dataset.action==='remove'||i.quantity<1)cart=cart.filter(x=>x!==i);
      saveCart(); renderCart();
    }));
  }
  function whatsapp(message){
    const num=String(cafeSettings.whatsappNumber||'').replace(/\D/g,'');
    if(!/^\d{10,15}$/.test(num)){toast('Add the café WhatsApp number in products.js first.');return;}
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`,'_blank','noopener');
  }

  // Shared basket controls work on home, menu, about, gallery and contact pages.
  document.querySelectorAll('.open-cart').forEach(b=>b.addEventListener('click',()=>{renderCart();overlay(cartOverlay,true);}));
  if($('close-cart')) $('close-cart').addEventListener('click',()=>overlay(cartOverlay,false));
  if($('continue-shopping')) $('continue-shopping').addEventListener('click',()=>overlay(cartOverlay,false));
  if(cartOverlay) cartOverlay.addEventListener('click',e=>{if(e.target===cartOverlay)overlay(cartOverlay,false);});
  if($('checkout')) $('checkout').addEventListener('click',()=>{
    if(!cart.length){toast('Your basket is empty');return;}
    const rows=cart.map(i=>{const p=products.find(x=>x.id===i.id);return `• ${p.name} x ${i.quantity} — ${price(p)}`;});
    whatsapp(`${cafeSettings.whatsappGreeting}\n\n${rows.join('\n')}\n\nPlease confirm availability and next steps.`);
  });
  if($('floating-whatsapp')) $('floating-whatsapp').addEventListener('click',()=>whatsapp('Hello Wicked Waffles Café! I would like to ask about your menu and availability.'));
  if($('modal-add')) $('modal-add').addEventListener('click',()=>{
    if(!selectedProduct)return;
    const q=Math.max(1,Math.min(99,Number($('modal-quantity').value)||1));
    addToCart(selectedProduct.id,q); overlay(productModal,false);
  });
  if(productModal){
    const close=productModal.querySelector('.close-modal');
    if(close) close.addEventListener('click',()=>overlay(productModal,false));
    productModal.addEventListener('click',e=>{if(e.target===productModal)overlay(productModal,false);});
  }
  if($('menu-search')) $('menu-search').addEventListener('input',e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts();});
  if($('category-filter')) $('category-filter').addEventListener('change',e=>{activeCategory=e.target.value;renderFilters();renderProducts();});
  if($('sort-filter')) $('sort-filter').addEventListener('change',e=>{sortMode=e.target.value;renderProducts();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(cartOverlay?.classList.contains('open'))overlay(cartOverlay,false);else if(productModal?.classList.contains('open'))overlay(productModal,false);}});
  renderFilters(); renderProducts(); renderCart();
})();
