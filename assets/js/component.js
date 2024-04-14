const history_list = document.querySelector("[data-history_list]")

function add_hlist(text) {
    const list = document.createElement("div")
    list.setAttribute("class","hlist")
    list.textContent = `${text}`

    history_list.append(list)
    history_list.scrollTo(0, history_list.scrollHeight)
}