from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class familymembers(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    currency = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'familymembers'

class parentallowance(models.Model):
    timestamp = models.DateField(auto_now_add=True)
    fam_member = models.ForeignKey(familymembers, on_delete= models.CASCADE)
    allowance = models.IntegerField()
    # contributors = models.ManyToManyField(familymembers)
    class Meta:
        ordering = ['-fam_member']
        
    def __str__(self):
        return f'{self.fam_member} contributed {self.allowance} on {self.timestamp}'

class constructionProject(models.Model):
    project = models.CharField(max_length=150)
    description = models.TextField(max_length=300)
    cost = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.project} - {self.description}'

class constructionInvestment(models.Model):
    person = models.ForeignKey(familymembers, on_delete= models.CASCADE)
    investment = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)
    phase = models.ForeignKey(constructionProject, on_delete=models.CASCADE)

    def __str__(self):
        return f'investment of {self.person} on project {self.phase} '

