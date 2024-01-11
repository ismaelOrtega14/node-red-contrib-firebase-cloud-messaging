const parseToFinalMessageInfo = {
  destination: function (destination, config) {
      let result = {}
      result[config.destinationMode] = destination

      return result
  },
  notificationTitle: function (title) {
      if (!title) return {}

      let result = {
          notification: {
              title: title,
          },
      }

      return result
  },
  notificationBody: function (body) {
      if (!body) return {}

      let result = {
          notification: {
              body: body,
          },
      }

      return result
  },
  notificationImage: function (image) {
      if (!image) return {}

      let result = {
          notification: {
              image: image,
          },
      }

      return result
  },
  data: function (data) {
      if (Object.keys(data).length == 0) return {}

      let result = {
          data: data,
      }

      return result
  },
}

module.exports = {
  parseToFinalMessageInfo,
}