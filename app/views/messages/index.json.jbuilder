if @new_message.present?
  json.array! @new_message do |message|
    json.id          message.id
    json.name        message.user.name
    json.content     message.content
    json.image       message.image.url
    json.date        message.created_at
  end
end