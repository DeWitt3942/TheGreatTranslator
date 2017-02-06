module ApplicationHelper
	def setWidth(n)
		return 'col-lg-'+(12/n).to_s
	end

	def admin?
		if current_user.nil?
			return false
		end
		return current_user.admin
	end	


	
end
