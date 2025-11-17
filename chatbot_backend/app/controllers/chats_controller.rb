require 'httparty'

class ChatsController < ApplicationController
  def create
    question = params[:question]

    begin
      response = HTTParty.post(
        "https://api.openai.com/v1/chat/completions",
        headers: {
          "Authorization" => "Bearer #{ENV['OPENAI_API_KEY']}",
          "Content-Type" => "application/json"
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful AI customer support assistant." },
            { role: "user", content: question }
          ]
        }.to_json
      )
      Rails.logger.info("OpenAI Response: #{response.body}")

      parsed = JSON.parse(response.body)   # <-- parse the raw JSON string
      answer = parsed.dig("choices", 0, "message", "content") || "Sorry, I couldn't get a response."
    rescue => e
      answer = "Error: #{e.message}"
    end

    render json: { answer: answer }
  end
end
