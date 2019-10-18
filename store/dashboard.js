export const state = () => ({
  showMenu: true,
  isLoading: false
})

export const mutations = {
  toggleMenu(state) {
    state.showMenu = !state.showMenu;
  }
}
