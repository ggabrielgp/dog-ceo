import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";

const ImageGrid = ({ data }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (data && responses.length > data.length) {
      let toDelete = null;
      responses.map((r, index) => {
        const obj = data.find((d) => d === r.name);
        if (!obj) {
          toDelete = index;
        }
      });
      if (toDelete !== null)
        /* console.log("splice", responses.splice(toDelete, 1)); */
        setResponses(responses.filter((r) => r !== responses[toDelete]));
    } else {
      Array.isArray(data) &&
        data.length &&
        data.map((d) => {
          const splittedName = d.toLowerCase().split(" ");
          const nameForGet = splittedName[1]
            ? `${splittedName[1]}/${splittedName[0]}`
            : splittedName[0];

          //["malva", "beban"]  --> ["www.google.cl/malva/imagen", "www.google.cl/beban/imagen", "www.google.cl/pape/imagen"]

          fetch(`https://dog.ceo/api/breed/${nameForGet}/images/random`)
            .then((promise) =>
              promise
                .json()
                .then((data) => {
                  //setResponses([...responses, {nombre: d, url:data.message}])
                  const obj = responses.find((r) => r.nombre === d);
                  if (!obj) {
                    /* responses.push({ nombre: d, url: data.message }); */
                    setResponses([
                      ...responses,
                      { nombre: d, url: data.message },
                    ]);
                  }
                })
                .catch((e) => console.log(e))
            )
            .catch((e) => console.log(e));
        });
    }
  }, [data]);

  return responses.length ? (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
      {responses.map((item, i) => (
        <ImageListItem key={`${item}${i}`}>
          <img src={item.url} alt={item.nombre} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    ""
  );
};

export default ImageGrid;
