require 'sendgrid-ruby'

class Task < ApplicationRecord
  include SendGrid

  belongs_to :category
  accepts_nested_attributes_for :category
  validates :description, presence: true

  def self.sendMail(form_data)
    from = Email.new(email: 'test@example.com')
    subject = form_data[:subject]
    to = Email.new(email: form_data[:to])
    content = Content.new(type: 'text/plain', value: form_data[:body])
    mail = Mail.new(from, subject, to, content)
    mail.send_at = form_data[:send_at]
    sg = SendGrid::API.new(api_key: ENV['REACT_APP_SENDGRID_API_KEY'])
    response = sg.client.mail._('send').post(request_body: mail.to_json)
    return response
  end

end
