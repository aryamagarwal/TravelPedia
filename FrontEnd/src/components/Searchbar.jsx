import React from 'react'

function Searchbar(props) {
    const [region, setRegion] = React.useState("")
    const handleChange = (e) => {
        setRegion(e.target.value)
        e.target.vlaue!=="" || e.target.value!==null? fetch("http://localhost:8085/experiences/search/" +e.target.value).then(res => res.json())
        .then(data => {console.log(data) ; props.setResults(data)}) : props.setResults([]);
    }
    return (
        <div className='w-full h-auto p-10 bg-white m-2'>
            <input type="text" placeholder='destination' value={region} onChange={(e) => handleChange(e)} />
        </div>
    )
}

export default Searchbar
 