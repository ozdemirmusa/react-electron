import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import './popup.css';

class App extends Component {
  constructor(props){
       super(props);
       this.state = {veri: [],kisiShow: false,telefonShow: false,id:0,ad:"",soyad:"",adres:"",kBAd:"",telefonid:"",telefon:"",tur:"",tBAd:""};
   }
   kisiKontrol=()=>{
     if (this.state.ad.length>0 && this.state.soyad.length>0 && this.state.adres.length>0) {
       if (this.state.kBAd==="KAYDET") {
         this.kisiEkle();
       }
       else if (this.state.kBAd==="GÜNCELLE") {
         this.kisiDuzelt();
       }
          this.setState({ad:"",soyad:"",adres:""});
     }
     else {
       alert("boş");
     }

   }
   telefonKontrol=()=>{
     if (this.state.tur.length>0 && this.state.telefon.length>0) {
       if (this.state.tBAd==="KAYDET") {
         this.telefonEkle();
       }
       else if (this.state.tBAd==="GÜNCELLE") {
         this.telefonDuzelt();
       }
          this.setState({tur:"",telefon:""});
     }
     else {
       alert("boş");
     }

   }
   kisiPopup=()=> {
this.setState({
    kisiShow: !this.state.kisiShow,
    ad:"",
    soyad:"",
    adres:""
});
}
telefonPopup=()=> {
this.setState({
 telefonShow: !this.state.telefonShow,
 tur:"",
 telefon:""
});
}
   kisiKayitButton=()=> {
this.setState({
    kBAd:"KAYDET",
    kisiShow: !this.state.kisiShow
});
}
kisiDuzeltButton=(id,ad,soyad,adres)=> {
this.setState({
 kBAd:"GÜNCELLE",
 id:id,
 ad:ad,
 soyad:soyad,
 adres:adres,
 kisiShow: !this.state.kisiShow
});
}
telefonKayitButton=(id)=> {
this.setState({
  id:id,
 tBAd:"KAYDET",
 telefonShow: !this.state.telefonShow
});
}
telefonDuzeltButton=(id,telefonid,tur,tel)=> {
this.setState({
tBAd:"GÜNCELLE",
id:id,
telefonid:telefonid,
tur:tur,
telefon:tel,
telefonShow: !this.state.telefonShow
});
}
   componentDidMount(){
     //fetch('https://randomuser.me/api/?results=500')
     this.kisiListe();
    }

    kisiListe=()=>{
      fetch("http://localhost:8080/kisiliste")
       .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson);
         this.setState({veri:responseJson});
          })
       .catch((error) =>{
         console.error(error);
       });
    }
    kisiEkle=()=>{
      fetch("http://localhost:8080/kisiekle",{
        method:"POST",
        headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
        body:JSON.stringify({"ad":this.state.ad,"soyad":this.state.soyad,"adres":this.state.adres})
      })
       .then((response) =>{this.kisiListe(); this.kisiPopup();})
       .catch((error) =>{
         console.error(error);
       });

    }
    kisiDuzelt=()=>{
      fetch("http://localhost:8080/kisiduzelt",{
        method:"PUT",
        headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
        body:JSON.stringify({"id":this.state.id,"ad":this.state.ad,"soyad":this.state.soyad,"adres":this.state.adres})
      })
       .then((response) =>{this.kisiListe(); this.kisiPopup();})
       .catch((error) =>{
         console.error(error);
       });

    }
    kisiSil=(kid)=>{
      fetch("http://localhost:8080/kisisil/"+kid,{
        method:"DELETE"
      })
       .then((response) =>{this.kisiListe();})
       .catch((error) =>{
         console.error(error);
       });
    }

    telefonEkle=()=>{
      fetch("http://localhost:8080/telefonekle/"+this.state.id,{
        method:"POST",
        headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
        body:JSON.stringify({"tur":this.state.tur,"tel":this.state.telefon})
      })
       .then((response) =>{this.kisiListe(); this.telefonPopup();})
       .catch((error) =>{
         console.error(error);
       });

    }
    telefonDuzelt=()=>{
      fetch("http://localhost:8080/telefonduzelt/"+this.state.id,{
        method:"PUT",
        headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
        body:JSON.stringify({"id":this.state.telefonid,"tur":this.state.tur,"tel":this.state.telefon})
      })
       .then((response) =>{this.kisiListe(); this.telefonPopup();})
       .catch((error) =>{
         console.error(error);
       });

    }
    telefonSil=(kid)=>{
      fetch("http://localhost:8080/telefonsil/"+kid,{
        method:"DELETE"
      })
       .then((response) =>{this.kisiListe();})
       .catch((error) =>{
         console.error(error);
       });
    }
  render() {
    return (
      <div class="container">
       <button type="button" class="btn btn-success" onClick={this.kisiKayitButton}>KİŞİ KAYDET</button>
{this.state.veri.map(kisi=>{return (
      <div className="row "   >
 <div className="col col-sm">
 <table class="table table-striped">
   <thead>
     <tr>
       <th scope="col">İŞLEMLER</th>
       <th scope="col">AD</th>
       <th scope="col">SOYAD</th>
       <th scope="col">ADRES</th>
       <th scope="col">TELEFONLAR</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <th scope="row">
       <button class="btn btn-danger" onClick={this.kisiSil.bind(this,kisi.id)}>SİL</button><br/>
       <button class="btn btn-primary" onClick={this.kisiDuzeltButton.bind(this,kisi.id,kisi.ad,kisi.soyad,kisi.adres)}>GÜNCELLE</button>
       </th>
       <td>{kisi.ad}</td>
       <td>{kisi.soyad}</td>
        <td>{kisi.adres}</td>
       <td>

       <table class="table table-striped">
         <thead>
           <tr>
             <th scope="col">İŞLEMLER</th>
             <th scope="col">TÜR</th>
             <th scope="col">TELEFON</th>
           </tr>
           </thead>

         <tbody>
         {kisi.telefon.map(telefon=>{return (
           <tr>
             <th scope="row">
             <button class="btn btn-danger" onClick={this.telefonSil.bind(this,telefon.id)}>SİL</button>
             <button class="btn btn-primary" onClick={this.telefonDuzeltButton.bind(this,kisi.id,telefon.id,telefon.tur,telefon.tel)}>GÜNCELLE</button>
             </th>
             <td>{telefon.tur}</td>
             <td>{telefon.tel}</td>
           </tr>
            );})}
         </tbody>
       </table>
       <button type="button" class="btn btn-success" onClick={this.telefonKayitButton.bind(this,kisi.id)}>TELEFON KAYDET</button>
       </td>
     </tr>
   </tbody>
 </table>
</div>
</div>
);})}
<div>{this.state.kisiShow ?
  <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <div class="form-group">
    <label >Ad</label>
    <input type="text"  value={this.state.ad} onChange={(ad) =>this.setState({ad:ad.target.value})} class="form-control"  placeholder="Adınızı Giriniz"/>
  </div>
  <div class="form-group">
<label >Soyad</label>
<input type="text" value={this.state.soyad} onChange={(soyad) =>this.setState({soyad:soyad.target.value})} class="form-control"  placeholder="Soyadınızı Giriniz "/>
</div>
<div class="form-group">
<label >Adres</label>
<input type="text" value={this.state.adres} onChange={(adres) =>this.setState({adres:adres.target.value})}class="form-control"  placeholder="Adresinizi Giriniz "/>
</div>

        <button onClick={this.kisiPopup}>KAPAT</button>
        <button onClick={this.kisiKontrol}>{this.state.kBAd}</button>
        </div>
      </div>
          : null
        }  </div>

        <div>{this.state.telefonShow ?
          <div className='popup'>
                <div className='popup_inner2'>
                  <h1>{this.props.text}</h1>
                  <div class="form-group">
            <label >Tür</label>
            <input type="text"  value={this.state.tur} onChange={(tur) =>this.setState({tur:tur.target.value})} class="form-control"  placeholder="Telefon Türünü Giriniz"/>
          </div>
          <div class="form-group">
    <label >Telefon</label>
<InputMask {...this.props} mask="+\9 (999) 999 99 99"  value={this.state.telefon} onChange={(telefon) =>this.setState({telefon:telefon.target.value})} class="form-control" />
  </div>
                <button onClick={this.telefonPopup}>KAPAT</button>
                <button onClick={this.telefonKontrol}>{this.state.tBAd}</button>
                </div>
              </div>
                  : null
                }  </div>
</div>
    );
  }
}

export default App;
