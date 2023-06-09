async function getTabData(DataFilePath) {
  const tabData = await fetch(DataFilePath).then(res => res.json())
  return tabData
}

function tabsClassList(numOfTabs) {
  const tabsClassList = []
  for (let i = 0; i < numOfTabs; i++) {
    tabsClassList.push(`tab${i}`)
  }
  return tabsClassList
}

export function contentTabs(...contentTabsID) {
  contentTabsID.forEach(async (id) => {
    // Nav
    const navContentTab = document.getElementById(id)
    const tabData = await getTabData(navContentTab.dataset.ctData)

    // Tabs
    const contentTabs = navContentTab.querySelectorAll('.nav-link')
    let activeContentTab = navContentTab.querySelector('.nav-link.active')

    // Target -> Content
    const contentTarget = document.querySelector(`[data-ct-contenttarget="${id}"]`)

    // Target -> Background
    const bgTarget = document.querySelector(`[data-ct-bgtarget="${id}"]`)
    const tabsBgClassList = tabsClassList(contentTabs.length)

    contentTabs.forEach(tab => {
      tab.addEventListener('click', (ev) => {
        if (!(ev.currentTarget === activeContentTab)) {
          const clickedTab = parseFloat(ev.currentTarget.dataset.ctTab)

          // Active Change
          activeContentTab.classList.remove('active')
          ev.currentTarget.classList.add('active')
          activeContentTab = ev.currentTarget

          // Content Change
          contentTarget.innerHTML = tabData[clickedTab].content

          // Backgroud Change
          bgTarget.classList.remove(...tabsBgClassList)
          bgTarget.classList.add(`tab${tabData[clickedTab].bgClassNum}`)
        }
      })
    })
  })
}
