import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";

const MultiSelector = ({ data, setSelected }) => {
  if (!data) return null;
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectedSub, setSelectedSub] = useState([]);
  const [cloneSub, setCloneSub] = useState([]);

  const breeds = Object.keys(data);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setCloneSub(selectedBreeds);
    setSelectedBreeds(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSub = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSub(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    //eliminar
    const difference = cloneSub.filter(
      (x) => selectedBreeds.indexOf(x) === -1
    )[0];
    if (difference) {
      setSubBreeds(subBreeds.filter((f) => !f.includes(difference)));
    }

    selectedBreeds.map((b) => {
      const value = Object.getOwnPropertyDescriptors(data)[b].value;
      if (value[0]) {
        let arr = [];
        value.forEach((v) => {
          let newName = `${v.charAt(0).toUpperCase() + v.slice(1)} ${
            b.charAt(0).toUpperCase() + b.slice(1)
          }`;
          !subBreeds.includes(newName) && arr.push(newName);
        });
        if (arr.length > 0) setSubBreeds([...subBreeds, ...arr]);
      }
    });
  }, [selectedBreeds]);

  useEffect(() => {
    let newArr = [];
    selectedBreeds.map((b) => {
      const value = Object.getOwnPropertyDescriptors(data)[b].value;
      //[]
      if (!value[0]) {
        // ["english", "french"]
        newArr.push(b);
      } else {
        value.map((v) => {
          let newName = `${v.charAt(0).toUpperCase() + v.slice(1)} ${
            b.charAt(0).toUpperCase() + b.slice(1)
          }`;

          const obj = selectedSub.find((sub) => sub === newName);

          if (obj) {
            newArr.push(obj);
          }
        });
      }
    });

    setSelected(newArr);
  }, [selectedBreeds, selectedSub]); //Boston Bulldog

  return (
    <div className="container">
      <div className="row" style={{ width: "90vw" }}>
        <div className="col-sm-12 col-lg-6">
          <FormControl fullWidth>
            <InputLabel id="multi-select">Raza</InputLabel>
            <Select
              className="form-control"
              size="small"
              fullWidth
              labelId="multi-select"
              id="check-raza"
              multiple
              value={selectedBreeds}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {breeds.map((b) => (
                <MenuItem key={b} value={b}>
                  <Checkbox checked={selectedBreeds.indexOf(b) > -1} />
                  <ListItemText primary={b} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-sm-12 col-lg-6">
          {subBreeds.length ? (
            <>
              <FormControl fullWidth>
                <InputLabel id="multi-select-2">Sub</InputLabel>
                <Select
                  className="form-control"
                  size="small"
                  labelId="multi-select-2"
                  id="check-subraza"
                  fullWidth
                  multiple
                  value={selectedSub}
                  onChange={handleChangeSub}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {subBreeds.map((b) => (
                    <MenuItem key={b} value={b}>
                      <Checkbox checked={selectedSub.indexOf(b) > -1} />
                      <ListItemText primary={b} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MultiSelector;
