import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from '../App'

const Add = ({token}) => {
  const [image, setImage] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [fabric, setFabric] = useState('')
  const [sizes, setSizes] = useState([])
  const [category, setCategory] = useState('Men')
  const [type, setType] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()

      image && formData.append('image', image)

      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('fabric', fabric)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('category', category)
      formData.append('type', type)

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})
      console.log(response.data)

      if (response.data.success) {
        toast.success(response.data.message);
        setImage(false);
        setName('');
        setDescription('');
        setPrice('')
        setFabric('')
        setSizes([])
        setCategory('Men')
        setType('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return (
    <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
      <div>
        <p className='mb-2'>Upload Image</p>

        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='w-28' alt="" />
          <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden/>
        </label>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value= {name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value= {description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Type</p>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} className='w-full px-3 py-2' placeholder='e.g. Kaftan, T-Shirt'/>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Fabric</p>
          <input type="text" value={fabric} onChange={(e) => setFabric(e.target.value)} className='w-full px-3 py-2' placeholder='Type Here'/>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='7500' />
        </div>
      </div>

     <div>
      <p className='mb-2'>Product Sizes</p>


      <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== "S") : [...prev, "S"])}><p className={`${sizes.includes('S') ? 'bg-[#c09c8b]' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p></div>

        <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== "M") : [...prev, "M"])}><p className={`${sizes.includes('M') ? 'bg-[#c09c8b]' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p></div>

        <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== "L") : [...prev, "L"])}><p className={`${sizes.includes('L') ? 'bg-[#c09c8b]' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p></div>

        <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== "XL") : [...prev, "XL"])}><p className={`${sizes.includes('XL') ? 'bg-[#c09c8b]' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p></div>

        <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}><p className={`${sizes.includes('XXL') ? 'bg-[#c09c8b]' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p></div>
      </div>
    </div>

    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

    </form>
  )
}

export default Add