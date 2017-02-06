class Word < ApplicationRecord
	validates :word, presence: true
	validates :translations, presence:true


    def self.translate_words(words)
      require 'net/http'
      require 'nokogiri'


      def self.make_links(urls)
        urls.each do |u|
          u['link'] = 'http://www.multitran.ru/c/m.exe?l1=1&l2=2&s='+u[:word]
        end
      end

       def self.make_recomended_links(urls)
        def_url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20161208T222342Z.818a40846d502080.49e380886331b369128c9d260c0502dd117ef0d1&lang=en-ru&text='
        urls.each do |u|
          u['link'] = def_url+u[:word]
        end
      end

      def self.load_pages(urls, process)
        done = false
        if urls.length == 0
          return
        end
        urls.each do |u|
          Thread.new do
            u['content'] = Net::HTTP.get( URI.parse(u['link']) )
            # puts "Successfully requested #{u['link']}"
            if urls.all? {|u| u.has_key?("content") }
              send(process, urls)
              done = true
              # exit
            end
          end
        end

        until done
          sleep(0.5)
        end
      end

      def self.process_data(urls)
        urls.each do |u|
          u[:trans] = extract_translations(u['content'])
          u.delete('content')
          u.delete('link')
        end
        # exit
      end


      def self.process_recomended_data(urls)
        require 'json'
         urls.each do |u|

          t = JSON.parse(u['content'])
          u[:recomended_translation] = t["text"][0]
          u.delete('content')
          u.delete('link')
        end
      end

      def self.extract_translations(html)
        page = Nokogiri::HTML(html)
        table = page.xpath("/html/body/table/tr/td[2]/table/tr/td/table[1]/tr[2]/td/table/tr/td[2]/table[2]")

        # puts('loaded')
        if table.length==0 
          return {}
        end
        rows = table.css('tr')
        if rows.length<2
          return {} 

        end
        ans = []
        current_type = nil
        this_type = {:type => nil, :vals=> Array.new}
        ans = {}
        rows.each do |row|
          if ans.length > 4
            break
          end
          tds = row.css('td')
          if tds.length == 1 
            current_type = tds.css('em').text
            if !ans.key?(current_type)
              ans[current_type] = Array.new
            end
          elsif row.css('td').length == 2
            t = tds[1].text
            t = t.split(';')
            t.each do |word|
              # puts(word)
              w = word.split('(')[0]
              word = w.strip!
              if (ans[current_type].length < 2)
                # puts ans[current_type].class
                if (ans.key?(current_type))
                  ans[current_type].push word
                end
              end
            end


          end
        end

        aans = {}
        ans.each do |k,v|
          if v.length>0
            aans[k] = v
          end
        end
        return aans
      end

      words = words.to_set
      urls = []
      words.each do |word|
        dict = {:word => word}
        urls.push dict
      end


     

      make_links urls
      load_pages(urls, :process_data)
      make_recomended_links urls

      load_pages(urls, :process_recomended_data)
      
      return urls

    end


    def self.fetch_array(w)
      words = []
      w.each do |word|
        found = Word.find_by_word word
        
        if found == nil
          words.push word
        end

      end
      t = translate_words(words)

      t.each do |translation|
        puts translation
        @word = Word.new(:word => translation[:word], :translations => translation[:trans], 
                           :recomended_translation => translation[:recomended_translation])
        @word.save
      end
      puts('YOoo')
      return t
    end


    def self.fetch(text)
	    w = text.gsub(/<\/?[^>]*>/, '').gsub(/\n\n+/, "\n").gsub(/^\n|\n$/, '').split(/\W+/).to_set
	    words = []
	    w.each do |word|
	      found = Word.find_by_word word.strip.downcase
	      
	      if found == nil
	        words.push word.strip.downcase
	      end

	    end
	    t = translate_words(words)

	    t.each do |translation|
	      @word = Word.new(:word => translation[:word], :translations => translation[:trans], :recomended_translation => translation[:recomended_translation])
	      @word.save
	    end
	    puts('YOoo')
	    return t
	    

    
    end


end
