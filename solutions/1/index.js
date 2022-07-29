module.exports = function({participants, sports}) { // 1. Не хватало деструктуризации
  /**
   * Подобно оператору new создает экземпляр объекта,
   * используя функцию-конструктор и параметры для нее
   */
  function constructFrom(fnConstructor, ...params) { // 2. Не хватало оператора rest
    return new fnConstructor(...params) // 3. Не хватало оператора new и spread
  }

  /**
   * Создает пары вида [’вид спорта’, ’имя участника’],
   * где первому виду спорта соответствует последний участник
   */
  function assignParicipants() {
    const participants = this.participants
    const sports = this.sports
    const orderIndexes = []

    for (let i = sports.length - 1; i >= 0; i--) { // 4. Была одна переменная i для всех
      orderIndexes.push(function () {
        return i
      })
    }

    return orderIndexes.map((getSportIndex, i) => [
      sports[i],
      participants[getSportIndex()],
    ])
  }

  function Contest(participants, sports) {
    this.participants = participants
    this.sports = sports
  }

  Contest.prototype.assignParicipants = assignParicipants

  const contest = constructFrom(Contest, participants, sports)

  return contest.assignParicipants()
}
