const url = 'https://reqres.in/api/unknown?per_page=12';

async function getValue () {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTPS ${response.status}: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  } catch(error) {
    throw new Error(`${error.message}`);
  }
}

export default getValue;