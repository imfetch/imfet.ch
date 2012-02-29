require 'action_view'
require 'pathname'
require 'tilt'
require 'uglifier'

class Site < ActionView::Base
  include ActionView::Helpers::TagHelper
  attr_accessor :host
  attr_accessor :url
  attr_accessor :title
  attr_accessor :description
  attr_accessor :view_path
  
  def initialize(
    host = nil,
    url = 'http://imfet.ch/',
    title = 'imfetch',
    description = 'A web image fetcher for DropBox lovers'
  )
    @host = host
    @url = url
    @title = title
    @description = description
  end

  def template
    @template ||= Tilt::ERBTemplate.new("#{view_path}/layout.erb")
  end

  def assets_path filename
    host ? "http://#{host}/assets/#{filename}" : "assets/#{filename}"
  end

  def apple_touch_icon size = nil
    tag(:link,
      :href => assets_path("apple-touch-icon#{ size ? "-#{size}x#{size}" : '' }-precomposed.png"),
      :rel => 'apple-touch-icon',
      :sizes => ( size ? "#{size}x#{size}" : nil ),
      :type => 'image/png'
    )
  end

  def render tmpl
    template.render(self) {  
      Tilt::ERBTemplate.new("#{view_path}/#{tmpl}.erb").render(self)
    }
  end
  
  def write_html tmpl, path
    File.open path, 'w' do |file|
      file.write(render(tmpl))
    end
  end

end

