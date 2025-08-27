
document.addEventListener('DOMContentLoaded', async ()=>{
  try{
    const products = await API.get('/products');
    const container = document.getElementById('products-list');
    container.innerHTML = products.map(p=>`<div class="col-12 col-md-3 mb-4"><div class="product-card p-2"><img src="${p.imageUrl||'/frontend/assets/images/default.svg'}" class="product-img"><div class="p-2"><h6>${p.name}</h6><p>${p.description}</p><strong>₦${p.price}</strong></div></div></div>`).join('');
  }catch(e){ console.error(e); }
});
