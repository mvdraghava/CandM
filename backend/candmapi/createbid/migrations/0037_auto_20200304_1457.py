# Generated by Django 2.2.5 on 2020-03-04 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0036_auto_20200224_1646'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpotQuotationDetails',
            fields=[
                ('bid', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='createbid.Bid')),
                ('estCost', models.FloatField()),
                ('completionperiod', models.CharField(default='30 Days', max_length=150)),
                ('gstIncl', models.BooleanField()),
                ('emdwaivedoff', models.BooleanField()),
            ],
        ),
        migrations.AddField(
            model_name='proposal',
            name='proposalApprovedDate',
            field=models.DateField(default=None, null=True),
        ),
    ]
