# Generated by Django 2.2.5 on 2020-01-21 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0031_proposal_indentdesignation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposal',
            name='indentDesignation',
            field=models.CharField(default=None, max_length=100),
        ),
    ]
