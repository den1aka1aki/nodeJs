document.addEventListener('click', event => {
 if(event.target.dataset.type === 'remove'){
     const id = event.target.dataset.id
    remove(id).then (() => event.target.closest('li').remove())
 } else if (event.target.dataset.type === 'edit'){
     const id = event.target.dataset.id;
     const title = event.target.parentNode.parentNode.childNodes[0].textContent.trim();
     console.log(title)
     const value = prompt("Edit", title);
     edit(id, value).then(() => {
         event.target.parentNode.parentNode.childNodes[0].textContent = value;
     });
 }
})

async function remove (id){
   await fetch(`/${id}`, {method: 'DELETE'})
}
async function edit (id, payload){
    await fetch(`/${id}`,{ method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title: payload})
    });

}
