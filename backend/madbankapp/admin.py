from django.contrib import admin

# Register your models here.

from . models import familymembers, parentallowance,constructionProject, constructionInvestment

admin.site.register(familymembers)
admin.site.register(parentallowance)
admin.site.register(constructionInvestment)
admin.site.register(constructionProject)

