export class NavBar {

  breadcrumbs: string[] = ["New Project"]

  private crumbsElement: HTMLDivElement = document.createElement("div")

  /*

  NavBar Structure:

  nav.nav-header
   -> div.left-nav-group
    -> div.logo
      -> img.logo-icon
      -> span.studio-title
    -> div.crumbsElement
      -> div.crumb
      -> div.crumb-divider
      -> div.crumb
      -> ... updated to match breadcrumbs array
      -> img.editable-icon
   -> div.right-nav-group
    -> div.project-settings
      -> img.project-settings-icon
      -> span.label
    -> div.manage-content
      -> img.manage-content-icon
      -> span.label
    -> div.account
    -> span.label
      -> img.account-icon
  */

  constructor() {
    const nav = document.getElementById("nav")
    if (!nav) return

    nav.classList.add("nav-header")

    const leftGroup = document.createElement("div")
    leftGroup.className = "left-nav-group"

    const logo = document.createElement("div")
    logo.className = "logo"
    const logoImg = document.createElement("img")
    logoImg.className = "logo-icon"
    logoImg.src="/ui/napster-logo.svg"
    const logoTitle = document.createElement("span")
    logoTitle.className = "studio-title"
    logoTitle.textContent = "Napster 3D Studio"
    logo.append(logoImg, logoTitle)

    // this.crumbsElement = 
    this.crumbsElement.className = "crumbsElement"
    
    leftGroup.append(logo, this.crumbsElement)
    this.renderBreadcrumbs()

    const rightGroup = document.createElement("div")
    rightGroup.className = "right-nav-group"

    const projectSettings = document.createElement("div")

    projectSettings.className = "right-nav-item"
    const projImg = document.createElement("img")
    projImg.className = "project-settings-icon"
    projImg.src = "/ui/icon-settings.svg"
    const projLabel = document.createElement("span")
    projLabel.className = "label"
    projLabel.textContent = "Project Settings"
    projectSettings.append(projImg, projLabel)

    const manageContent = document.createElement("div")

    manageContent.className = "right-nav-item"
    const manageImg = document.createElement("img")
    manageImg.className = "manage-content-icon"
    manageImg.src = "/ui/icon-content.svg"
    const manageLabel = document.createElement("span")
    manageLabel.className = "label"
    manageLabel.textContent = "Content"
    manageContent.append(manageImg, manageLabel)

    const account = document.createElement("div")
    account.className = "right-nav-item"
    const accountIcon = document.createElement("img")
    accountIcon.className = "account-icon"
    accountIcon.src = "/ui/account.png"
    const accountLabel = document.createElement("span")
    accountLabel.className = "label"
    accountLabel.textContent = "Welcome, Steve"
    account.append(accountLabel, accountIcon)

    rightGroup.append(projectSettings, manageContent, account)

    nav.append(leftGroup, rightGroup)
  }

  renderBreadcrumbs() {
    this.crumbsElement.innerHTML = ""

    this.breadcrumbs.forEach((crumb) => {
      const divider = document.createElement("div")
      divider.className = "crumb-divider"
      divider.textContent = "/"
      this.crumbsElement.appendChild(divider)

      const crumbDiv = document.createElement("div")
      crumbDiv.classList.add("crumb")
      crumbDiv.id = "project-name"
      crumbDiv.textContent = crumb
      this.crumbsElement.appendChild(crumbDiv)
    })

  }

}