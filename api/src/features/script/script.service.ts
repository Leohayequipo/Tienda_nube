import axios from 'axios';

export async function instalarScript(store_id: number, access_token: string) {
  const result = await axios.post(
    `https://api.tiendanube.com/v1/${store_id}/scripts`,
    {
      src: "https://iridescent-creponne-e6710a.netlify.app/tiendanube.js",
      event: "onload",
      location: "store_front"
    },
    {
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
        "User-Agent": "lic.mannanice@gmail.com - D2A_test"
      }
    }
  );

  console.log("✅ Script instalado:", result.data);
}
