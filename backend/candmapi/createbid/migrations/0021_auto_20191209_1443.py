# Generated by Django 2.2.5 on 2019-12-09 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0020_ltegeneralconditions_contractperiodtext'),
    ]

    operations = [
        migrations.AddField(
            model_name='ltegeneralconditions',
            name='emd',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='ltegeneralconditions',
            name='emdText',
            field=models.CharField(default=' ', max_length=50000),
        ),
    ]