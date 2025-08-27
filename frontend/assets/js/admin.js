
let token = null;
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('login-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch('/api/auth/login', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if(data.token){ token = data.token; document.getElementById('auth-area').style.display='none'; document.getElementById('admin-ui').style.display='block'; loadData(); }
    else alert(data.message || 'Login failed');
  });

  async function loadData(){
    loadProducts(); loadBlogs();
  }

  async function loadProducts(){
    const products = await API.get('/products');
    document.getElementById('products-table').innerHTML = products.map(p=>`<tr><td><img src="${p.imageUrl||'/frontend/assets/images/default.svg'}" class="table-img"></td><td>${p.name}</td><td>${p.category||''}</td><td>${p.price}</td><td><button class="btn btn-sm btn-danger del-prod" data-id="${p._id}">Delete</button></td></tr>`).join('');
    document.querySelectorAll('.del-prod').forEach(b=> b.addEventListener('click', async e=>{ const id=e.currentTarget.dataset.id; await API.del('/products/'+id, token); loadProducts(); }));
  }

  async function loadBlogs(){
    const blogs = await API.get('/blogs');
    document.getElementById('blogs-table').innerHTML = blogs.map(b=>`<tr><td><img src="${b.imageUrl||'/frontend/assets/images/default.svg'}" class="table-img"></td><td>${b.title}</td><td>${new Date(b.createdAt).toLocaleDateString()}</td><td><button class="btn btn-sm btn-danger del-blog" data-id="${b._id}">Delete</button></td></tr>`).join('');
    document.querySelectorAll('.del-blog').forEach(b=> b.addEventListener('click', async e=>{ const id=e.currentTarget.dataset.id; await API.del('/blogs/'+id, token); loadBlogs(); }));
  }

  document.getElementById('product-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', document.getElementById('p-name').value);
    fd.append('category', document.getElementById('p-cat').value);
    fd.append('price', document.getElementById('p-price').value);
    fd.append('description', document.getElementById('p-desc').value);
    const file = document.getElementById('p-image').files[0];
    if(file) fd.append('image', file);
    await fetch('/api/products', { method:'POST', headers: { Authorization: 'Bearer '+token }, body: fd });
    loadProducts();
    e.target.reset();
  });

  document.getElementById('blog-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', document.getElementById('b-title').value);
    fd.append('excerpt', document.getElementById('b-excerpt').value);
    fd.append('content', document.getElementById('b-content').value);
    const file = document.getElementById('b-image').files[0];
    if(file) fd.append('image', file);
    await fetch('/api/blogs', { method:'POST', headers: { Authorization: 'Bearer '+token }, body: fd });
    loadBlogs();
    e.target.reset();
  });
});
