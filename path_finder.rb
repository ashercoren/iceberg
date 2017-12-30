require 'polaris'
require 'two_d_grid_map'
require 'georuby'

include GeoRuby::SimpleFeatures

class PathFinder

  def self.find_path src,dst,polygons_coordinates
    #create a Polaris map and pather
    map = TwoDGridMap.new [src[0],dst[0]].max+1, [src[1],dst[1]].max+1
    pather = Polaris.new map

    #create Polgon objects from polygon corrdinates
    polygons = polygons_coordinates.reduce([]){|res,coordinares|
      res << Polygon.from_coordinates(coordinares)
    }

    #add walls for all points that are in one of the polygons
    map.h.times do |x|
      map.w.times do |y|
        point = Point.from_x_y x,y
        polygons.each {|polygon|
          if polygon.contains_point? point
            map.place TwoDGridLocation.new(x,y), "ME" 
            break
          end
        }
      end
    end

    #create from and to points
    from = TwoDGridLocation.new src[0], src[1]
    to = TwoDGridLocation.new dst[0], dst[1]

    #find path
    path = pather.guide(from,to)

    #return map of path points
    path.map{|p| {x:p.location.x,y:p.location.y}} if path
  end
end

#puts PathFinder.find_path({x:0,y:0},{x:8,y:8},[[[[2,2],[2,4],[4,4],[4,2]]]])
