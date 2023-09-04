import axios from "axios";

export async function geocode(query: string): Promise<[number, number] | null> {
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
  );

  console.log(response.data);
  const data = await response.data;
  if (data && data.length > 0) {
    console.log([parseFloat(data[0].lon), parseFloat(data[0].lat)]);
    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  }
  return null;
}
