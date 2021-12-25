export const list = () => {
    console.log('todo: fetch help list.');
    return [];
}

export default function setupHelpInit() {
    
    return {
        list,
    };
}