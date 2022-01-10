import { createContext, useEffect, useState } from "react"

const DataContext = createContext({})

export function AllBreeds({ children }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => setData(data));
    }, [])

    return <DataContext.Provider value={data}>
        {children}
    </DataContext.Provider>
}

export default DataContext