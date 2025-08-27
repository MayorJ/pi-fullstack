
document.addEventListener('DOMContentLoaded', async ()=>{
  try{
    const blogs = await API.get('/blogs');
    const list = document.getElementById('blog-list');
    list.innerHTML = blogs.map(b=>`<div class="col-md-6 mb-4"><div class="blog-post p-3"><img src="${b.imageUrl||'/frontend/assets/images/default.svg'}" style="width:100%;height:200px;object-fit:cover;"><h3>${b.title}</h3><p>${b.excerpt||''}</p><div>${b.content}</div></div></div>`).join('');
  }catch(e){ console.error(e); }
});
