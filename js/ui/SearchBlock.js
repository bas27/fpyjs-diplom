/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }


  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    const btnReplace = this.element.querySelector('.replace');
    btnReplace.addEventListener('click', () => {
      const userIdInput = this.element.querySelector('input')
      const userId = userIdInput.value.trim()
      if (!userId) {
        console.log('no user id')
        return
      }
      console.log('click replace')
      console.log('User ID: ', userId)
      VK.get(userId)
    })
    const btnAdd = document.querySelector('.add')
    btnAdd.addEventListener('click', () => {
      const userIdInput = this.element.querySelector('input')
      const userId = userIdInput.value.trim()
      if (!userId) {
        console.log('no user id')
        return
      }
      console.log('click replace')
      console.log('User ID: ', userId)
    })
  }

}