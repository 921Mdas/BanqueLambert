from rest_framework import serializers
from .models import constructionInvestment, parentallowance

class myModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = parentallowance
        fields = "__all__"
 