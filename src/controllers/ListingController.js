// src/controllers/ListingController.js
const ListingController = {
  fetchData: async () => {
    try {
      const response = await axios.get('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
      return response.data.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw error;
    }
  }
};
