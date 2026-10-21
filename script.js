'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const items=[...document.querySelectorAll('.gallery-item')];
const lightbox=document.querySelector('.lightbox'), largeImage=lightbox.querySelector('img');
items.forEach(item=>item.addEventListener('click',event=>{event.preventDefault();largeImage.src=item.getAttribute('href');largeImage.alt=item.querySelector('img').alt;lightbox.showModal();document.body.classList.add('lightbox-open');}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const box=lightbox.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>document.body.classList.remove('lightbox-open'));
