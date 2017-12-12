class VersesController < ApplicationController
  def index
    @lyrics = nil

    if Verse.find_by(current: true)
      @lyrics = Verse.find_by(current: true).lyrics
    end
  end
end
