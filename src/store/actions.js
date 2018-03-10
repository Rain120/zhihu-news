import * as types from './mutation_types'

export function addNews ({ commit, state }, { stories, ids }) {
  let nStories = state.stories.slice()
  let nIds = state.ids.slice()

  let newStories = nStories.concat(stories)
  let newIds = nIds.concat(ids)

  commit(types.ADD_NEWS, newStories)
  commit(types.ADD_IDS, newIds)
}

export function addDate ({ commit }, date) {
  commit(types.ADD_DATE, date)
  commit(types.ADD_HOMEPAGE_DATE, date)
}

export function addDateStr ({ commit }, dateStr) {
  commit(types.ADD_DATE_STR, dateStr)
  commit(types.ADD_HOMEPAGE_DATE_STR, dateStr)
}

export function setGoType ({ commit, state }, { id, type }) {
  commit(types.ADD_NEW_ID, id)
  commit(types.CHANGE_GO_TYPES, type)
}
