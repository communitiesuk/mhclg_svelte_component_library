 
 export function measureCharacterWidth(node, { char, fontSize }, characterWidths) {
    function update({ char, fontSize }) {
      if (!characterWidths[fontSize]) characterWidths[fontSize] = {};
      characterWidths[fontSize][char] = node.getComputedTextLength();
      characterWidths = characterWidths; // trigger reactivity
    }
    update({ char, fontSize });
    return { update };
  }