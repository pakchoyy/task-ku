(()=>{
  const alertBox=document.querySelector('#installAlert');
  const button=document.querySelector('#installNow');
  const later=document.querySelector('#installLater');
  const copy=document.querySelector('#installCopy');
  if(!alertBox||!button)return;
  const installed=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const isiOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
  let promptEvent=null;
  if(installed()){alertBox.classList.remove('show');return}
  alertBox.classList.add('show');
  if(isiOS){button.disabled=false;button.textContent='Cara install';copy.textContent='Di Safari, tekan Bagikan lalu Tambahkan ke Layar Utama.'}
  addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();promptEvent=event;button.disabled=false;button.textContent='Install aplikasi';copy.textContent='Siap dipasang dan dibuka seperti aplikasi HP.';
  });
  button.addEventListener('click',async()=>{
    if(isiOS){copy.textContent='Tekan Bagikan di Safari, lalu pilih Tambahkan ke Layar Utama.';return}
    if(!promptEvent){copy.textContent='Installer Chrome belum siap. Tunggu beberapa detik, lalu coba lagi.';return}
    button.disabled=true;button.textContent='Membuka installer...';promptEvent.prompt();const result=await promptEvent.userChoice;
    if(result.outcome==='accepted')alertBox.classList.remove('show');else{button.disabled=false;button.textContent='Install aplikasi'}
    promptEvent=null;
  });
  later?.addEventListener('click',()=>alertBox.classList.remove('show'));
  addEventListener('appinstalled',()=>alertBox.classList.remove('show'));
})();
