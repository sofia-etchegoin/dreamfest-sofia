import { getGarden } from './gardenHelper'
import { SET_WAITING } from '../actions/waiting'
import { dispatch, getState } from '../store'
import { SET_GARDEN } from '../actions/garden'

jest.mock('../store')

afterEach(() => {
  return jest.resetAllMocks()
})

describe('getGarden', () => {
  describe('-> GET /gardens/:id api call success', () => {
    it('dispatches waiting correctly', () => {
      getState.mockImplementation(() => ({ user: {} }))
      function consume () {
        return Promise.resolve({ body: {} })
      }
      return getGarden(consume)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
          expect(dispatch).toHaveBeenCalledWith({ type: SET_GARDEN, garden: { } })
          return null
        })
    })
    it('return correct garden object', () => {
      getState.mockImplementation(() => ({ user: { gardenId: 2 } }))
      function consume (path) {
        expect(path).toMatch('2')
        return Promise.resolve({
          body: {
            name: 'test garden',
            description: 'a rad test garden',
            url: 'cooltestgarden.com',
            events: [],
            address: 'cool place, nz',
            lat: 123,
            lon: -123
          }
        })
      }
      return getGarden(consume)
        .then((garden) => {
          expect(dispatch).toHaveBeenCalledWith({ type: SET_WAITING })
          expect(dispatch).toHaveBeenCalledWith({
            type: SET_GARDEN,
            garden: {
              name: 'test garden',
              description: 'a rad test garden',
              url: 'cooltestgarden.com',
              events: [],
              address: 'cool place, nz',
              lat: 123,
              lon: -123
            }
          })
          return null
        })
    })
  })

  describe('-> GET /gardens/:id api call rejection', () => {
    it('dispatches error correctly', () => {
      getState.mockImplementation(() => ({ user: { gardenId: null } }))
      function consume () {
        return Promise.reject(new Error('mock error'))
      }
      return getGarden(consume)
        .then(() => {
          expect(dispatch.mock.calls[1][0].errorMessage).toBe('mock error')
          return null
        })
    })
  })
})
