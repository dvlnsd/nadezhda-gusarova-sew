'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){menuToggle.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menuToggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
const filters=[...document.querySelectorAll('[data-filter]')];
const gallery=document.querySelector('#gallery');
const items=[...gallery.querySelectorAll('.gallery-item')];
const more=document.querySelector('.gallery-more');
let selected='all',expanded=false;
function updateGallery(){
 filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selected)));
 items.forEach(item=>{item.hidden=selected==='all'?(!expanded&&item.classList.contains('gallery-extra')):item.dataset.category!==selected;});
 gallery.classList.toggle('filtered',selected!=='all');
 more.hidden=selected!=='all';more.setAttribute('aria-expanded',String(expanded));
 more.innerHTML=(expanded?'Свернуть галерею':'Смотреть всю галерею')+' <span aria-hidden="true">⟶</span>';
}
filters.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.filter;updateGallery();}));
more.addEventListener('click',()=>{expanded=!expanded;updateGallery();});
const lightbox=document.querySelector('.lightbox'), largeImage=lightbox.querySelector('img');
items.forEach(item=>item.addEventListener('click',event=>{event.preventDefault();largeImage.src=item.getAttribute('href');largeImage.alt=item.querySelector('img').alt;lightbox.showModal();document.body.classList.add('lightbox-open');}));
lightbox.querySelector('button').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const box=lightbox.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>document.body.classList.remove('lightbox-open'));
