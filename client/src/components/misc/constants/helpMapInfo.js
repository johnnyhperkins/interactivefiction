export default (location) => {
  switch (location) {
    case '':
      return {
        title: 'Welcome to Interactive Fiction!',
        message: 'To create your first poem, click the plus button, give it a name and click "Create Poem". Click on the poem to take you to the edit screen.'
      }
    case 'poem':
      return {
        title: 'Editting a Poem',
        message: 'Start by clicking the + button to create a section. Each section has a first line, followed by 1 - 3 stanzas. Each stanza has a lead word which, when clicked on, will reveal the stanza and hide the other lead words and stanzas in that section. You can create as many sections as you like! You can see how this works by creating a few stanzas and an additional section, and clicking on the eye icon in the upper right corner.'
      }
    case 'poems':
      return {
        title: 'Interactive Poem',
        message: 'Click any of the words below the first line to reveal its stanza. You can reset the poem once all the sections have been viewed.'
      }
    default:
      return false
  }
}
