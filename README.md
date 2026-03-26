### This little project just demonstrates an issue that arose between tags v4.5.3 and v4.5.4 of fast-xml-parser

Just clone the repository and run

```node index.js```

You'll notice that with v4.5.4 '#text' fields appear just prior to unpaired tags are in the original input and the values associated with following tag is present. A list of unpaired tags are provided via the 'unpairedTags' option when the parser is created.
