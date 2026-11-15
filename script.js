'use strict';
const products = [
  {name:'Cappuccino',cat:'Coffee',price:280,img:'cappuccino',featured:true},
  {name:'Latte',cat:'Coffee',price:300,img:'latte'},
  {name:'Espresso',cat:'Coffee',price:220,img:'espresso'},
  {name:'Iced Coffee',cat:'Cold drinks',price:320,img:'icedcoffee'},
  {name:'Cold Brew',cat:'Cold drinks',price:350,img:'coldbrew',featured:true},
  {name:'Croissant',cat:'Bakery',price:220,img:'croissant',featured:true},
  {name:'Chocolate Cake',cat:'Bakery',price:380,img:'chocolatecake'},
  {name:'Sandwich',cat:'Snacks',price:340,img:'sandwitch'},
  {name:'Burger',cat:'Snacks',price:450,img:'burger'}
];
const card = p => `<article class="card"><img src="images/${p.img}.jpg" alt="${p.name}" loading="lazy" width="400" height="300"><div class="card-body"><h3>${p.name}</h3><span class="cat">${p.cat}</span><span class="price">NPR ${p.price}</span></div></article>`;
const menuGrid = document.getElementById('menu-grid');
const render = f => { menuGrid.innerHTML = products.filter(p => f === 'all' || p.cat === f).map(card).join(''); };
document.getElementById('featured').innerHTML = products.filter(p => p.featured).map(card).join('');
render('all');
const chips = document.querySelectorAll('.chip');
chips.forEach(c => c.addEventListener('click', () => {
  chips.forEach(x => { x.classList.toggle('active', x === c); x.setAttribute('aria-pressed', x === c); });
  render(c.dataset.filter);
}));

const toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('nav');
const setNav = open => { nav.classList.toggle('open', open); toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); };
toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

const links = [...nav.querySelectorAll('a')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id));
}), {rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s => io.observe(s));

const form = document.getElementById('contact-form'), ok = document.getElementById('form-success');
const rules = {
  name: v => v.length < 2 ? 'Enter your name (at least 2 characters).' : '',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, like name@example.com.',
  phone: v => /^\+?[0-9\s-]{7,15}$/.test(v) ? '' : 'Enter a phone number with 7 to 15 digits.',
  subject: v => v.length < 3 ? 'Enter a subject (at least 3 characters).' : '',
  message: v => v.length < 10 ? 'Write a message of at least 10 characters.' : ''
};
const check = el => {
  const msg = rules[el.name](el.value.trim());
  document.getElementById(el.id + '-err').textContent = msg;
  el.classList.toggle('invalid', !!msg);
  el.setAttribute('aria-invalid', !!msg);
  return !msg;
};
form.querySelectorAll('input,textarea').forEach(el => el.addEventListener('blur', () => check(el)));
form.addEventListener('submit', e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll('input,textarea')];
  const valid = fields.map(check).every(Boolean);
  ok.hidden = !valid;
  if (valid) form.reset(); else fields.find(f => f.classList.contains('invalid')).focus();
});
document.getElementById('year').textContent = new Date().getFullYear();
