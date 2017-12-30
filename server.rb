# myapp.rb
require 'sinatra'
require 'sinatra/reloader' if development?

require 'json'
require_relative 'path_finder'

set :public_folder, File.dirname(__FILE__) + '/dist'
set :port, ENV['PORT'] || 4567

get '/' do
  File.read(File.join('./dist', 'index.html'))
end

post '/calcRoute' do
  data = JSON.parse request.body.read
  src = data['src']
  dst = data['dst']
  polygons = data['polygons'] || []
  halt 422, 'muse send src and dst' unless src && dst
  PathFinder.find_path(src,dst,[polygons]).to_s
  
end