/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  static ACCESS_TOKEN = 'vk1.a.E75yb3HzXEO8WHX3C491TSKbv1sdLDQuD6mGhXY_8RKVuV0RwIs_fcJdiTxJEC4J6MO2eFMDB0E2ofdckD6GdsPeHs291tBq5GZ3E6dd8yuxqYOhGsyYBo1YsGx2_yeu4dz_5NF-MuE3cc2k_Jz2hAyg0WwycsCoTufAM_KLkQ3bYOWDtSAJ7EZLwPAFw9OL';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    VK.lastCallback = callback
    const url =
        "https://api.vk.com/method/photos.get" +
        "?user_id=" + id +
        "&access_token=" + VK.ACCESS_TOKEN +
        "&v=5.131" +
        "&callback=VK.processData";

    const script = document.createElement("script");
    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
  }


  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    if (!result || !result.response || !result.response.items) {
      alert('Ошибка при получении данных!');
      return;
    }
    const data = result.response.items;
    let largestImages = [];
    data.forEach(item => {
      if (!item.sizes || item.sizes.length === 0) {
        return;
      }
      let largestSize = item.sizes[0];
      item.sizes.forEach(size => {
        if (size.width > largestSize.width) {
          largestSize = size;
        }
      });
      largestImages.push(largestSize.url);
    });
    const script = document.querySelector('script[src*="api.vk.com/method/photos.get"]');
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
    if (typeof VK.lastCallback === 'function') {
      VK.lastCallback(largestImages);
    }
    VK.lastCallback = () => {}
  }
}

// const input = document.querySelector('input')
// const btnReplace = document.querySelector('.replace')
// btnReplace.addEventListener('click', () => {
//   console.log(input.value)
// })
//
// const script = document.createElement("script");
// document.getElementsByTagName("head")[0].appendChild(script);
// const user_id = 224293006;
// // const access_token = "your_token"
// const ACCESS_TOKEN = 'vk1.a.E75yb3HzXEO8WHX3C491TSKbv1sdLDQuD6mGhXY_8RKVuV0RwIs_fcJdiTxJEC4J6MO2eFMDB0E2ofdckD6GdsPeHs291tBq5GZ3E6dd8yuxqYOhGsyYBo1YsGx2_yeu4dz_5NF-MuE3cc2k_Jz2hAyg0WwycsCoTufAM_KLkQ3bYOWDtSAJ7EZLwPAFw9OL';
// const url =
// "https://api.vk.com/method/photos.getAll" +
// "?user_id=" + user_id +
// "&access_token=" + ACCESS_TOKEN +
// // "&count=10" +
// "&v=5.131" +
// "&callback=my_callback";
// script.src = url;
//
// function my_callback(data) {
// console.log(data);
// console.log(data.response);
// }