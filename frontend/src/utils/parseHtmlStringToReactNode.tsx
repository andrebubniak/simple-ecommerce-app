// Recursive function to parse HTML nodes into React components
const parseHTMLNode = (node: ChildNode, index = 0): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
        // For text nodes, just return the text content
        return node.textContent;
    }

    // If the node is an element node, process based on its tag
    switch (node.nodeName) {
        case "P":
            return (
                <p key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </p>
            );
        case "DIV":
            return (
                <div key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </div>
            );
        case "UL":
            return (
                <ul key={index}>
                    {Array.from(node.childNodes).map((li, listIndex) => (
                        <li key={listIndex}>
                            {Array.from(li.childNodes).map(parseHTMLNode)}
                        </li>
                    ))}
                </ul>
            );
        case "LI":
            return (
                <li key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </li>
            );
        case "SPAN":
            return (
                <span key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </span>
            );
        case "H1":
            return (
                <h1 key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </h1>
            );
        case "H3":
            return (
                <h3 key={index}>
                    {Array.from(node.childNodes).map(parseHTMLNode)}
                </h3>
            );
        default:
            // If the tag isn't handled above, return the element as is
            return (
                <span>{Array.from(node.childNodes).map(parseHTMLNode)}</span>
            );
    }
};

// Main utility function to parse HTML string to React Node
export const parseHTMLStringToReactNode = (
    htmlString: string
): React.ReactNode => {
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const childNodes = Array.from(doc.body.childNodes);

    return childNodes.map(parseHTMLNode);
};
