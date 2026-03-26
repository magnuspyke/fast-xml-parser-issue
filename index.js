import { XMLParser as XMLParser_v4_5_3 } from "fast-xml-parser-v4.5.3";
import { XMLParser as XMLParser_v4_5_4 } from "fast-xml-parser-v4.5.4";

const content = [
'<OFX>',
' <CREDITCARDMSGSRSV1>',
'   <CCSTMTTRNRS>',
'     <TRNUID>0',
'     <STATUS>',
'       <CODE>0',
'       <SEVERITY>INFO',
'     </STATUS>',
'     <CCSTMTRS>',
'       <CURDEF>USD',
'       <CCACCTFROM>',
'         <ACCTID>1234567890',
'       </CCACCTFROM>',
'     </CCSTMTRS>',
'   </CCSTMTTRNRS>',
' </CREDITCARDMSGSRSV1>',
'</OFX>'
].join("\n");

// Search for unpaired tags (tags without a closing tag)
function findUnpairedTags(content) {
  const stack = [];
  const unpairedTags = [];
  const regex = /<(\/?)(\w+)>/g;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const isClosingTag = match[1] === '/';
    const tagName = match[2];

    if (isClosingTag) {
      while (stack.length !== 0 && stack[stack.length - 1] !== tagName) {
        const unpairedTag = stack.pop();
        if (!unpairedTags.includes(unpairedTag)) {
          unpairedTags.push(unpairedTag);
        }
      }
      stack.pop();  // pop the closing tag name
    } else {
      stack.push(tagName);
    }
  }

  return unpairedTags.concat(stack); // Return both unpaired opening and closing tags
}

console.log("Unpaired Tags:", findUnpairedTags(content), "\n");

const options = {
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: false,
    parseAttributeValue: false,
    trimValues: true,
    parseTagValue: false,
    unpairedTags: findUnpairedTags(content)
  };

  const parser_v4_5_3 = new XMLParser_v4_5_3(options);
  const parser_v4_5_4 = new XMLParser_v4_5_4(options);

  const parserResult_v4_5_3 = parser_v4_5_3.parse(content);
  const parserResult_v4_5_4 = parser_v4_5_4.parse(content);

  console.log("Parser Result (v4.5.3):", JSON.stringify(parserResult_v4_5_3), "\n");
  console.log("Parser Result (v4.5.4):", JSON.stringify(parserResult_v4_5_4));