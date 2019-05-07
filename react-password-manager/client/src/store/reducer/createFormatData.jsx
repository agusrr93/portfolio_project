const defaultState = {
  createFormatData: (inputUrlSite, inputUsernameOrEmail, inputPassword) => {
    let formatDataCreateData = {
      'Url site': inputUrlSite,
      'Username or email': inputUsernameOrEmail,
      'Password': inputPassword,
      'Created At': Date(),
      'Update At': Date()
    }

    return formatDataCreateData
  }
}

const createFormatData = (state = defaultState, actions) => {
  return state
}

export default createFormatData
