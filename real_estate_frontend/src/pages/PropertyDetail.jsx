import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import { getProperty, contactSeller } from '../services/propertyService';
export default function PropertyDetail(){
  const { id } = useParams();
  const [property,setProperty]=useState(null);
  const [msg,setMsg]=useState({name:'',email:'',message:''});
  useEffect(()=>{(async()=>{const res=await getProperty(id);setProperty(res.data);} )();},[id]);
  const submit=(e)=>{
    e.preventDefault();
    contactSeller(id,msg);
    alert("Message sent!");
  }
  if(!property)return<div>Loading...</div>
  return(
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {property.images?.map(img=> <img key={img.public_id} src={img.url} className="w-full h-64 object-cover rounded"/>)}
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <div className="text-brandBlue font-bold mb-4">₹{property.price.toLocaleString()}</div>
          <p className="mb-4">{property.description}</p>
          <h3 className="font-semibold">Location</h3>
          <p>{property.address}, {property.city}</p>
          <div className="h-56 my-3">
            <iframe width="100%" height="100%" src={`https://www.google.com/maps?q=${property.location?.lat},${property.location?.lng}&z=14&output=embed`}/>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <form onSubmit={submit} className="space-y-2">
              <input className="border w-full p-2" placeholder="Your Name" onChange={e=>setMsg({...msg,name:e.target.value})}/>
              <input className="border w-full p-2" placeholder="Email" onChange={e=>setMsg({...msg,email:e.target.value})}/>
              <textarea className="border w-full p-2" placeholder="Message" onChange={e=>setMsg({...msg,message:e.target.value})}/>
              <button className="px-4 py-2 bg-brandGold text-brandBlue rounded">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}