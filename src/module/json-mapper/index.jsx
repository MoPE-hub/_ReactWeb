export default function jsonMapper(type, jsonData) {

  if (type === "outBouds") {

    /*************
      인포 / 컴포넌트
    *************/

    const data = jsonData.composer
    const dataComponents = []

    data.map((item, index) => {
      item.components.textBoxes ? item.components.textBoxes.map((textBox, textBoxIndex) => {
        dataComponents.push({
          type: "textBox",
          width: textBox.width,
          height: textBox.height,
          x: textBox.x,
          y: textBox.y,
          targetPage: textBox.targetPage,
          user: "?"
        })
      }) : console.log('textBoxes')

      item.components.checkBoxes ? item.components.checkBoxes.map((checkBox, checkBoxIndex) => {
        dataComponents.push({
          type: "checkBox",
          width: checkBox.width,
          height: checkBox.height,
          x: checkBox.x,
          y: checkBox.y,
          targetPage: checkBox.targetPage,
          user: "?"
        })
      }) : console.log('checoBoxes')

      item.components.signs ? item.components.signs.map((sign, signIndex) => {
        dataComponents.push({
          type: "sign",
          width: sign.width,
          height: sign.height,
          x: sign.x,
          y: sign.y,
          targetPage: sign.targetPage,
          user: "?"
        })
      }) : console.log('sign')

      item.components.signPads ? item.components.signPads.map((signPad, signPadIndex) => {
        dataComponents.push({
          type: "signPad",
          width: signPad.with,
          height: signPad.height,
          x: signPad.x,
          y: signPad.y,
          targetPage: signPad.targetPage,
          user: "?"
        })
      }) : console.log('signPad')

      item.components = dataComponents

      return item
    })

    /*************
      추가항목
    *************/

    const expansionData = jsonData.expansion
    const expansionDataComponents = []

    expansionData.map((item, index) => {
      item.components.columnsExpansions ? item.components.columnsExpansions.map((expansion, expansionIndex) => {
        expansionDataComponents.push({
          title: item.column.title,
          type: "textBox",
          width: expansion.width,
          height: expansion.height,
          x: expansion.x,
          y: expansion.y,
          targetPage: expansion.targetPage,
          user: "?"
        })
      }) : console.log('expansions')

      item.components = expansionDataComponents

      delete item['column']

      return item
    })

    return {
      data, expansionData
    }
  }
  else {
    
    console.log(type)
    console.log('이게 지옥일꺼다.... 들어오는 코드...')

    return null
  }
}
